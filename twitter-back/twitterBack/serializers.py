from rest_framework import serializers
from .models import *

class PostSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='profile.username', read_only=True)
    user_at = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Post
        fields = '__all__'

class ReplySerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='profile.username', read_only=True)
    userat = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Reply
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    userat = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Profile
        fields = '__all__'
