import React from 'react'
import Layout from '../components/Layout'
import Navbar from '../components/nav/Navbar'
import Tasklist from '../components/task/Tasklist'


function Home() {
  return (
       <Layout>
        <Navbar />
        <Tasklist />
       </Layout>
  )
}

export default Home
