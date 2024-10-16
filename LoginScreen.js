
const LoginScreen = () => {
    // campos de usuario, email y password
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // envía los datos al backend usando Axios
    const handleLogin = () => {
        if (username === '' || email === '' || password === '') {
            Alert.alert('Todos los campos son obligatorios');
            return;
        }

       
        const payload = {
            username: username,
            email: email,
            password: password
        };

        // petición POST usando Axios
        axios.post('http://localhost/backend/login.php', payload)
            .then(response => {
               
                if (response.data.success) {
                    Alert.alert('Login exitoso', 'Bienvenido! ' + response.data.username);
                } else {
                    Alert.alert('Error', response.data.message);
                }
            })
            .catch(error => {
                console.log(error);
                Alert.alert('Error', 'Ocurrió un problema con la conexión');
            });
    };

    return (
        <View>
            <Text>Username</Text>
            <TextInput
                placeholder="Ingrese su username"
                value={username}
                onChangeText={setUsername}
                style={{ borderWidth: 1, marginBottom: 10 }}
            />
            <Text>Email</Text>
            <TextInput
                placeholder="Ingrese su email"
                value={email}
                onChangeText={setEmail}
                style={{ borderWidth: 1, marginBottom: 10 }}
            />
            <Text>Password</Text>
            <TextInput
                placeholder="Ingrese su contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ borderWidth: 1, marginBottom: 10 }}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

export default LoginScreen;
