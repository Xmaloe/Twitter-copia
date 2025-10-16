from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewSets import *
from .views import *

router = DefaultRouter()

router.register(r'posts', PostViewSet)
router.register(r'replies', ReplyViewSet)
router.register(r'profiles', ProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register_user),
    path('login/', login_user)
]