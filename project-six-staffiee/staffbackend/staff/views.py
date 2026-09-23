from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets
from .models import Staff
from .serializers import StaffSerializer


def landing_page(request):
    return render(request, 'landing.html')

class StaffViewSet(viewsets.ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer

