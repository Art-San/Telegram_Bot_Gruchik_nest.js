// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { useCreateProfile } from './hooks/useCreateProfile';
// import { IDataFormCreateProfile } from '@/types/profile.types';

// const CreateProfileForm: React.FC<{ userId: number }> = ({ userId }) => {
//   const { register, handleSubmit, formState: { errors } } = useForm<IDataFormCreateProfile>();
//   const { createProfile, isPending } = useCreateProfile(
//     () => console.log('Profile created successfully'),
//     () => console.log('Error creating profile')
//   );

//   const onSubmit = (data: IDataFormCreateProfile) => {
//     createProfile({ userId, data });
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {/* Поля формы */}
//       <input {...register('fullName')} placeholder="Full Name" />
//       {errors.fullName && <span>{errors.fullName.message}</span>}

//       <input {...register('phone')} placeholder="Phone" />
//       {errors.phone && <span>{errors.phone.message}</span>}

//       <input {...register('role')} placeholder="Role" />
//       {errors.role && <span>{errors.role.message}</span>}

//       <input {...register('userAvatar')} placeholder="User Avatar URL" />
//       {errors.userAvatar && <span>{errors.userAvatar.message}</span>}

//       <button type="submit" disabled={isPending}>Create Profile</button>
//     </form>
//   );
// };

// export default CreateProfileForm;
