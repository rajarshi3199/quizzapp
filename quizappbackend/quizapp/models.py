from django.db import models
import uuid

# Create your models here.

class Quiz(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    topic = models.CharField(null=True, max_length=100)
    level = models.CharField(null=True, max_length=50)
    totalQuestions = models.PositiveIntegerField(default=0)
    perQuestionScore = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.topic} ({self.id})"

class Question(models.Model):
    QUESTION_TYPES = (
        ('MCQs', 'Multiple Choice'),
        ('TF', 'True/False'),
        ('SA', 'Short Answer'),
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions', null=True)
    question = models.TextField()
    type = models.CharField(max_length=4, choices=QUESTION_TYPES, default='MCQs')
    choices = models.JSONField(null=True, blank=True)
    correctAnswer = models.CharField(null=True, max_length=200)

    def __str__(self):
        return self.question
