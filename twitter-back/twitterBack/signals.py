from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from twitterBack.models import Profile

@receiver(post_save, sender=User)
def create_new_user(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)