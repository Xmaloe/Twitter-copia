
from django.db.models import Func, F
from rest_framework import viewsets
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from .serializers import *

@permission_classes([IsAuthenticated])
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer

@permission_classes([IsAuthenticated])
class ReplyViewSet(viewsets.ModelViewSet):
    queryset = Reply.objects.all().order_by('-created_at')
    serializer_class = ReplySerializer

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.annotate(followers_count=Func(F('followers_ids'), function='CARDINALITY', output_field=IntegerField())).order_by('-followers_count')
    serializer_class = ProfileSerializer