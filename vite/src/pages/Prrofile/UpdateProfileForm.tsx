interface CreatedProfileProps {
  userId: number
}

const UpdateProfileForm: React.FC<CreatedProfileProps> = ({ userId }) => {
  return (
    <>
      <div>UpdateProfileForm</div>
      {/* <ProfileForm
        userId={userId}
        profile={profileQuery.data.profile}
        onSuccess={handleSuccess}
        submitText={'Продолжить'}
      /> */}
    </>
  )
}

export default UpdateProfileForm
