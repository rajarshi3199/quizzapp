from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from ..models import Quiz, Question
from .serializers import QuizSerializer, QuestionSerializer

class QuizViewSet(viewsets.ViewSet):
    def create(self, request):
        quiz_data = request.data
        serializer = QuizSerializer(data=quiz_data)
        if serializer.is_valid():
            quiz = serializer.save()
            questions_data = quiz_data.pop('questions')
            for question_data in questions_data:
                question_data['quiz'] = quiz.id
                question_serializer = QuestionSerializer(data=question_data)
                if question_serializer.is_valid():
                    question_serializer.save()
                else:
                    return Response(question_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        quiz = get_object_or_404(Quiz, pk=pk)
        serializer = QuizSerializer(quiz)
        return Response(serializer.data)
    
    def destroy(self, request, pk=None):
        try:
            quiz = get_object_or_404(Quiz, pk=pk)
        except Quiz.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        quiz.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def retrieveAll(self, request):
        quiz = Quiz.objects.all()
        serializer = QuizSerializer(quiz, many=True)
        return Response(serializer.data)
    
    def deleteAll(self, request):
        queryset = Quiz.objects.all()
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


