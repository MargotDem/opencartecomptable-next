import React, { Component } from 'react'
import axios from 'axios'

import PageComponent from '../../components/PageComponent'
import TopSection from '../../components/TopSection'
import ResultsTable from '../../components/ResultsTable'

export default class Schools extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      schools: []
    })
  }

  componentDidMount () {
    let pathname = this.props.location.pathname
    if (pathname === '/etablissements' || pathname === '/agences') {
      // fetch schools corresponding to search criteria
      let isAgencies = pathname === '/agences' ? '&agencies' : ''
      let url = this.props.location
      const requestUrl = 'http://localhost:8888/public/api/schools' + url.search + isAgencies
      axios.get(requestUrl)
        .then(schools => {
          this.setState({ schools: schools.data })
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      // fetch corresponding school
      let url = this.props.location
      const requestUrl = 'http://localhost:8888/public/api' + url.pathname
      axios.get(requestUrl)
        .then(school => {
          this.setState({ schools: school.data })
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  render () {
    const { schools } = this.state
    let title = ''
    let text = ''
    let isAgencySearch = false
    if (this.props.location.pathname === '/etablissements') {
      title = 'Établissements correspondant à vos critères de recherche :'
      text = 'Cliquez sur le bouton "UAI agence" pour obtenir le détail de l’agence en question<br>Vous pouvez visualiser les informations d’un établissement en cliquant sur son nom'
    } else if (this.props.location.pathname === '/agences') {
      isAgencySearch = true
      title = 'Agences correspondant à vos critères de recherche :'
      text = 'Cliquez sur le bouton "UAI agence" pour obtenir le détail de l’agence en question<br>Vous pouvez visualiser les informations de l’établissement agence en cliquant sur son nom'
    } else {
      let schoolName = ''
      if (schools[0] !== undefined) {
        schoolName = schools[0]['nom']
      }
      title = schoolName
      text = 'Cliquez sur le bouton "UAI agence" pour obtenir le détail de l’agence de cet établissement<br>Vous pouvez visualiser les informations de l’établissement en cliquant sur son nom'
    }

    return (
      <PageComponent>
        <TopSection
          title={title}
          text={text}
          smallText
        />
        <ResultsTable
          schools={schools}
          isAgencySearch={isAgencySearch}
        />
      </PageComponent>
    )
  }
}
