from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.contrib.auth.models import User
from django.db.models import TextField, IntegerField


# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    username = models.TextField(null=True, blank=False, default='Novo Usuario', max_length=30)
    profile = models.ImageField(upload_to='uploads/', blank=True, null=True, default='defaults/profilePicture.jpg')
    banner = models.ImageField(upload_to='uploads/', blank=True, null=True, default='defaults/banner.jpg')
    created_at = models.DateField(auto_now_add=True)
    following_ids = ArrayField(models.IntegerField(), blank=True, default=list)
    followers_ids = ArrayField(models.IntegerField(), blank=True, default=list)
    posts_liked = ArrayField(models.IntegerField(), blank=True, default=list)
    posts_favourited = ArrayField(models.IntegerField(), blank=True, default=list)
    posts_visited = ArrayField(models.IntegerField(), blank=True, default=list)
    replies_liked = ArrayField(models.IntegerField(), blank=True, default=list)
    posts_made = IntegerField(default=0)
    bio = TextField(null=True, blank=True, max_length=120, default='Bio')

    def __str__(self):
        return self.user.username

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    text = models.TextField(blank=True, null=True)
    attachment = models.ImageField(upload_to='uploads/', blank=True, null=True)
    comments = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)
    views = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    post_edited = models.BooleanField(default=False)

class Reply(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='replies')
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)