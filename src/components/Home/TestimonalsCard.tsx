import { FaStar } from 'react-icons/fa';

const TestimonalsCard = ({
  testimonals,
}: {
  testimonals: {
    profile_url: string;
    username: string;
    description: string;
    rating: number;
  };
}): JSX.Element => {
  return (
    <article className='w-96  rounded bg-sky-400 p-10 shadow'>
      <img
        className='h-24 w-16 rounded-full object-cover py-4'
        src={testimonals.profile_url}
        alt={testimonals.username}
      />
      <hr className='w-40 py-2 ' />
      <h2 className='text-xl'>
        {testimonals.username} &nbsp;{' '}
        <span className='flex items-baseline'>
          <FaStar />
          {testimonals.rating}
        </span>
      </h2>
      <p className='text-sm'>{testimonals.description}</p>
    </article>
  );
};

export default TestimonalsCard;
