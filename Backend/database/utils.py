def user_profile_picture_path(instance, filename):
    return f'user_{instance.id}/profile/{filename}'
