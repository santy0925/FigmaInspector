import { useState } from 'react';

// Componente principal de la aplicación que gestiona las vistas
export default function App() {
  // Estados para controlar la vista actual y los datos del usuario
  const [view, setView] = useState('login'); // 'login', 'register', 'forgotPassword', 'profile'
  const [user, setUser] = useState(null);
  
  // Estado para los formularios
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState({ text: '', type: '' });

  // Función para simular una llamada a la API con un retardo
  const simulateApiCall = (success, data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (success) {
          resolve(data);
        } else {
          reject(data);
        }
      }, 1500); // 1.5 segundos de retardo para simular la red
    });
  };

  // Manejador de cambios en los inputs del formulario
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Lógica para el inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage({ text: 'Iniciando sesión...', type: 'info' });

    // Simulando la validación en el servidor
    try {
      const response = await simulateApiCall(true, {
        name: 'Juan',
        lastName: 'Pérez',
        email: formData.email,
        phone: '1234567890',
        token: 'mock-token-123',
      });
      setUser(response);
      setView('profile');
      setMessage({ text: '¡Bienvenido de nuevo!', type: 'success' });
    } catch (error) {
      setMessage({ text: 'Credenciales inválidas. ¿Olvidaste tu contraseña o deseas crear una cuenta?', type: 'error' });
    }
  };

  // Lógica para el registro de usuario
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage({ text: 'Registrando usuario...', type: 'info' });

    // Validaciones de frontend (mínimas)
    if (formData.password !== formData.confirmPassword) {
      setMessage({ text: 'Las contraseñas no coinciden.', type: 'error' });
      return;
    }
    if (!formData.email.endsWith('@gmail.com')) {
      setMessage({ text: 'El correo debe ser de Gmail.', type: 'error' });
      return;
    }

    // Simulando la llamada a la API de registro
    try {
      const response = await simulateApiCall(true, {
        message: 'Usuario registrado exitosamente',
        user: { email: formData.email, name: formData.name },
      });
      // Simulando notificaciones de backend
      console.log(`Email de bienvenida enviado a: ${formData.email}`);
      console.log(`SMS de confirmación enviado a: ${formData.phone}`);
      setMessage({ text: response.message, type: 'success' });
      setView('login');
      setFormData({ name: '', lastName: '', email: '', password: '', phone: '', confirmPassword: '' });
    } catch (error) {
      setMessage({ text: 'El correo ya está registrado.', type: 'error' });
    }
  };

  // Lógica para la recuperación de contraseña
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage({ text: 'Enviando enlace de recuperación...', type: 'info' });

    // Simulando la llamada a la API de recuperación
    try {
      const response = await simulateApiCall(true, {
        message: 'Enlace de recuperación y código enviados'
      });
      // Simulando notificaciones de backend
      console.log(`Email con link de restablecimiento enviado a: ${formData.email}`);
      console.log(`SMS con código de validación enviado a: ${formData.phone}`);
      setMessage({ text: response.message, type: 'success' });
      setFormData({ ...formData, email: '' });
      setView('login');
    } catch (error) {
      setMessage({ text: 'El correo no existe en nuestro sistema.', type: 'error' });
    }
  };

  // Lógica para actualizar el perfil del usuario
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setMessage({ text: 'Guardando cambios...', type: 'info' });

    // Simulando la llamada a la API de actualización
    try {
      const response = await simulateApiCall(true, {
        name: formData.name || user.name,
        lastName: formData.lastName || user.lastName,
        phone: formData.phone || user.phone,
        password: formData.password ? 'Contraseña actualizada' : 'Contraseña sin cambios',
      });
      setUser({
        ...user,
        name: formData.name || user.name,
        lastName: formData.lastName || user.lastName,
        phone: formData.phone || user.phone,
      });
      setMessage({ text: 'Perfil actualizado exitosamente.', type: 'success' });
    } catch (error) {
      setMessage({ text: 'Error al actualizar el perfil.', type: 'error' });
    }
  };
  
  // Componente de Mensajes
  const Message = ({ text, type }) => {
    if (!text) return null;
    let colorClass = '';
    switch (type) {
      case 'info':
        colorClass = 'bg-blue-100 text-blue-700';
        break;
      case 'success':
        colorClass = 'bg-green-100 text-green-700';
        break;
      case 'error':
        colorClass = 'bg-red-100 text-red-700';
        break;
      default:
        colorClass = 'bg-gray-100 text-gray-700';
    }
    return (
      <div className={`p-3 my-4 rounded-lg text-sm ${colorClass}`}>
        {text}
      </div>
    );
  };

  // Renderizado de las diferentes vistas
  const renderView = () => {
    switch (view) {
      case 'login':
        return (
          <form onSubmit={handleLogin} className="space-y-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
            <Message text={message.text} type={message.type} />
            <div>
              <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contraseña</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Ingresar
              </button>
              <button
                type="button"
                onClick={() => { setView('register'); setFormData({ name: '', lastName: '', email: '', password: '', phone: '', confirmPassword: '' }); setMessage({ text: '', type: '' }); }}
                className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
              >
                Crear Usuario
              </button>
              <button
                type="button"
                onClick={() => { setView('forgotPassword'); setFormData({ ...formData, email: '' }); setMessage({ text: '', type: '' }); }}
                className="text-sm text-blue-600 hover:underline mt-2 text-center"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </form>
        );
      case 'register':
        return (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Registro de Usuario</h2>
                <button onClick={() => { setView('login'); setFormData({ name: '', lastName: '', email: '', password: '', phone: '', confirmPassword: '' }); setMessage({ text: '', type: '' }); }} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">
                  &times;
                </button>
              </div>
              <Message text={message.text} type={message.type} />
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Apellido</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Correo Electrónico (Gmail)</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Teléfono Celular</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                  />
                </div>
                <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                  Crear Cuenta
                </button>
              </form>
            </div>
          </div>
        );
      case 'forgotPassword':
        return (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Recuperar Contraseña</h2>
            <Message text={message.text} type={message.type} />
            <div>
              <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Enviar Link y SMS
              </button>
              <button
                type="button"
                onClick={() => { setView('login'); setFormData({ ...formData, email: '' }); setMessage({ text: '', type: '' }); }}
                className="text-sm text-blue-600 hover:underline mt-2 text-center"
              >
                Volver al Login
              </button>
            </div>
          </form>
        );
      case 'profile':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Gestión de Perfil</h2>
            <Message text={message.text} type={message.type} />
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || user.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Apellido</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName || user.lastName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Teléfono Celular</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || user.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nueva Contraseña</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />
              </div>
              <div className="flex justify-between items-center space-x-4">
                <button type="submit" className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                  Guardar Cambios
                </button>
                <button
                  type="button"
                  onClick={() => { setView('login'); setUser(null); setFormData({ name: '', lastName: '', email: '', password: '', phone: '', confirmPassword: '' }); setMessage({ text: '', type: '' }); }}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-sm">
        {renderView()}
      </div>
    </div>
  );
}

