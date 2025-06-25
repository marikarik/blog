import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './сomponents/Layout/Layout'
import ArticlesList from './pages/ArticlesList/ArticlesList'
import ArticleFull from './pages/ArticleFull/ArticleFull'
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'
function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<ArticlesList/>}/>
        <Route path='articles/:slug' element={<ArticleFull/>}/>
        <Route path='sign-in' element={<SignIn/>}/>
        <Route path='sign-up' element={<SignUp/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
