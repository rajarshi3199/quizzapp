from django.urls import path
from . import views

urlpatterns = [
    path('quiz/', views.QuizViewSet.as_view({'post': 'create'}), name='create_quiz'),
    path('quiz/all/', views.QuizViewSet.as_view({'get': 'retrieveAll', 'delete': 'deleteAll'}), name='all_quiz'),
    # path('quiz/all/', views.QuizViewSet.as_view({'get': 'retrieveAll'}), name='get_all_quiz'),
    # path('quiz/all/', views.QuizViewSet.as_view({'delete': 'deleteAll'}), name='delete_all_quiz'),
    path('quiz/<str:pk>/', views.QuizViewSet.as_view({'get': 'retrieve', 'delete': 'destroy'}), name='get_a_quiz'),
]


