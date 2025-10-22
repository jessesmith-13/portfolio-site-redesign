interface AboutProps {
  Title: string;
} 


export default function About({ Title }: AboutProps) {
  return (
    <header style={{ padding: '2rem', textAlign: 'center', background: '#f5f5f5' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{Title}</h1>
    </header>
  );
}
