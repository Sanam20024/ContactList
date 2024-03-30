import './App.css';
import ContactList from './components/ContactList';
import { AuthProvider } from './context';
function App() {
  return (
    
      <AuthProvider>
      <ContactList />
      </AuthProvider>
  );
}

export default App;
