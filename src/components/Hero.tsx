interface HeroProps {
  data: {
    heading: string,
    subtext: string
  }
} 


export default function Hero({ data }: HeroProps
) {
  return (
    <div style={{ backgroundColor: 'white', height: '1000px'}}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{data.heading}</h1>
      <p>{ data.subtext }</p>
    </div>
  );
}
