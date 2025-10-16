from django.apps import AppConfig


class TwitterbackConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'twitterBack'

    def ready(self):
        import twitterBack.signals
