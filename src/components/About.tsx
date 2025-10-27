interface AboutProps {
  data: {
    Title: string
  };
} 


export default function About({ data }: AboutProps) {

  console.log (data)
  return (
    <section style={{ padding: '2rem', textAlign: 'center', background: 'blue' }}>
      <h1 style={{ fontSize: '2.5rem', color: 'black', marginBottom: '0.5rem' }}>{data.Title}</h1>
    </section>
  );
}
