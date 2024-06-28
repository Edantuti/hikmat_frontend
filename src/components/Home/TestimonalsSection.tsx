import profileUrl from '../../assets/image.png';
import profile from '../../assets/person.jpg';
import TestimonalsCard from './TestimonalsCard';

type TestimonalsType = {
  profile_url: string;
  username: string;
  description: string;
  rating: number;
};

const TestimonalsSection = (): JSX.Element => {
  const TestimonalsObjects: TestimonalsType[] = [
    {
      profile_url: profileUrl,
      username: 'Mukesh',
      description:
        "Hikmat rocks! Easy website, fast deliveries, top-quality Ayurvedic products. It's my go-to for unani remedies",
      rating: 4,
    },
    {
      profile_url: profile,
      username: 'Rajesh',
      description:
        "I was looking for ayurvedic medicines, kinda tough to find the best ones. But then there's Hikmat e commerce, which has good products. Am suggesting my friends to buy from this store as well",
      rating: 3,
    },
  ];

  return (
    <>
      <section className='h-screen bg-gradient-to-t from-[#007A8C] via-[#007E74] to-[#008358] py-10 text-white'>
        <h2 className='py-6 text-center font-volkhov text-4xl'>
          This Is What Our Customers Say
        </h2>
        <p className='mx-auto w-[70%] text-center'>
          Some amazing reviews from our customers.
        </p>
        <div className='mx-auto my-40 flex w-[40%] space-x-10 text-black'>
          {TestimonalsObjects.map((ob, id) => (
            <TestimonalsCard key={id} testimonals={ob} />
          ))}
        </div>
      </section>
    </>
  );
};

export default TestimonalsSection;
