from django.db import models

# Create your models here.

class Staff(models.Model):
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    address = models.TextField()
    phone_number = models.CharField(max_length=15)
    payroll_number = models.CharField(max_length=50, unique=True)
    staff_image = models.ImageField(upload_to='staff_images/', blank=True, null=True)

    def __str__(self):
        return f"{self.name} ({self.payroll_number})"
