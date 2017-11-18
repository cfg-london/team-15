# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Referral(models.Model):
    sender = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    phone = models.CharField(max_length=12)
    urgency = models.BooleanField()
    extrainfo = models.CharField(max_length=100)
    latitude = models.DecimalField(null=True, max_digits=9, decimal_places=6)
    longitude = models.DecimalField(null=True, max_digits=9, decimal_places=6)

    def __str__(self):
        return sender + ' referred ' + name + ' for ' + category + ' issues.'

class Category(models.Model):
    name = models.CharField(max_length=50)
    referrals = models.ManyToManyField(Referral)

    def __str__(self):
        return name

class Subcategory(models.Model):
    name = models.CharField(max_length=50)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return name + ' is a subcategory of ' + category.name
