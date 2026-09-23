from django.contrib import admin

# Register your models here.
# from django.contrib import admin
from .models import Staff

@admin.register(Staff)
class StaffAdmin(admin.ModelAdmin):
    list_display = ('name', 'age', 'phone_number', 'payroll_number')
    search_fields = ('name', 'payroll_number', 'phone_number')
    list_filter = ('age',)
    ordering = ('name',)
