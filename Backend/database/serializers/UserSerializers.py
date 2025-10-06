from rest_framework import serializers
from database.models import UserModel

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['id', 'username', 'email', 'full_name', 'role', 'profile_picture']

class UserAutocompleteSerializer(serializers.ModelSerializer):
    label = serializers.SerializerMethodField()
    value = serializers.IntegerField(source='id')

    class Meta:
        model = UserModel
        fields = ['label', 'value']

    def get_label(self, obj):
        return str(obj)

class UserProfilePictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ["profile_picture"]