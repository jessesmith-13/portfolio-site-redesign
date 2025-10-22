interface HeaderProps {
  logo: string;
} 


export default function Header({ logo}: HeaderProps) {
  return (
    <header style={{ padding: '2rem', textAlign: 'center', background: '#f5f5f5' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{logo}</h1>
    </header>
  );
}
