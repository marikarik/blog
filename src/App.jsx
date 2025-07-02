import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './сomponents/Layout/Layout'
import ArticlesList from './pages/ArticlesList/ArticlesList'
import ArticleFull from './pages/ArticleFull/ArticleFull'
import SignIn from './pages/forms/SignIn/SignIn'
import SignUp from './pages/forms/SignUp/SignUp'
import UserProfile from './pages/forms/UserProfile/UserProfile'
import AcrticleCreate from './pages/forms/ArticleCreateEdit/ArticleCreateEdit'
function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<ArticlesList/>}/>
        <Route path='/articles/:slug' element={<ArticleFull/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/create-article' element={<AcrticleCreate isEdit={false}/>}/>
        <Route path='/user-profile' element={<UserProfile/>}/>
        <Route path='/articles/:slug/edit' element={<AcrticleCreate isEdit/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
