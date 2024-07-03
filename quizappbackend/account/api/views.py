from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from ..models import User
from .serializers import UserSerializer

class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDeleteView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.user == instance:
            return Response({'error': 'Cannot delete your own account'}, status=status.HTTP_400_BAD_REQUEST)
        self.perform_destroy(instance)
        return Response({'success': 'User deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    
@csrf_exempt
@api_view(['GET'])
def validate_password(request, user_id, password):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    if user.check_password(password):
        return Response({'success': 'Password is valid'})
    else:
        return Response({'error': 'Invalid password'}, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['GET'])   
def get_user_by_email(request, email):
    user = get_object_or_404(User, email=email)
    serializer = UserSerializer(user)
    return Response(serializer.data)

@csrf_exempt
@api_view(['GET'])
def get_user_by_uuid(request, uuid):
    user = get_object_or_404(User, id=uuid)
    serializer = UserSerializer(user)
    return Response(serializer.data)