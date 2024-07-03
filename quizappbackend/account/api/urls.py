from django.urls import path
from .views import UserCreateView, UserDeleteView, validate_password, UserListView, get_user_by_uuid, get_user_by_email

urlpatterns = [
    path('user/create/', UserCreateView.as_view(), name='user-create'),
    path('user/all/', UserListView.as_view(), name='user-list'),
    path('user/uuid/<uuid:uuid>/', get_user_by_uuid, name='user-by-uuid'),
    path('user/email/<str:email>/', get_user_by_email, name='user-by-email'),
    path('user/<uuid:id>/', UserDeleteView.as_view(), name='user-delete'),
    path('user/verify/<uuid:user_id>/<str:password>/', validate_password, name='validate-password'),
]