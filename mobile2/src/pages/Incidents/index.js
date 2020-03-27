import React, {useState, useEffect} from 'react'
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Feather} from '@expo/vector-icons'
import api from '../../services/api'

import logoimg from '../../assets/logo.png'
import styles from './styles'

export default function Incidents() {
    const navigation = useNavigation()
    const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    function navigateToDetail(incident) {
        navigation.navigate('Detail', {incident})
    }
    
    async function loadIncidents() {

        if (loading) {
            return
        }

        if (total > 0 && incidents.length === total) {
            return
        }

        setLoading(true)

        const res = await api.get('incidents', {params: {page}})
        setPage(page + 1)
        setLoading(false)


        setIncidents([...incidents, ...res.data])
        setTotal(res.headers['X-Total-Count'])
    }

    useEffect(() => {
        loadIncidents()
    }, [])

        return (
            <View style={styles.container}>
            <View style={styles.header}>
            <Image source={logoimg} />
            <Text style={styles.headerText}>Total de <Text style={styles.headerTextBold}>{total} casos</Text>.</Text>
            </View>
            <Text style={styles.title}>Bem vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
            
            <FlatList
                style={styles.incidentList}
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item:incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>Caso:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>Valor:</Text>
                        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' 
                    }).format(incident.value)                    
                    }</Text>

                        <TouchableOpacity 
                        style={styles.detailsButton}
                        onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#e02041"></Feather>
                        </TouchableOpacity>
                    </View>
                )} 
            />

            </View>
        )
    }
