from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from django.http import JsonResponse





from base.serializer import ProfileSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    user = request.user
    profile = user.profile
    serializer = ProfileSerializer(profile, many=False)
    return Response(serializer.data)


# Create your views here.

@api_view(['POST'])
def create_user(request):
    usuario = request.data.get('username')
    password = request.data.get('password')
    if not usuario or not password :
        return JsonResponse({'error': 'Usuario y contraseña son requeridos'}, status=400)
    user = User.objects.create_user(username=usuario, password=password)
    user.save()
    return JsonResponse({'message': 'Usuario creado exitosamente'})

