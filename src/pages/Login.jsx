import LoginPageCard from '../components/landingPageCard'
const Login = () => {
    return (
        <LandingPageCard/>
    )
}

// const { data, error } = await supabase.auth.signUp({
//   email: 'example@email.com',
//   password: 'example-password',
//   options: {
//     data: {
//       first_name: 'John',
//       age: 27,
//     },
//   },
// })

export default Login;
