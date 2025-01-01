import Address from './(address)/addres';
import PerosnalInfo from './(personalInfo)/personalInfo';

export default function Profile() {
  return (
    <div className='flex flex-col gap-12'>
      <PerosnalInfo />
      <Address />
    </div>
  );
}
