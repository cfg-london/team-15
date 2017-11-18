# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from datetime import datetime

# Create your models here.
class Referral(models.Model):
    sender = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    phone = models.CharField(max_length=12)
    urgency = models.BooleanField()
    date = models.DateTimeField(default=datetime.now)
    extrainfo = models.CharField(max_length=100, blank=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True)

    def __str__(self):
        return self.sender + ' referred ' + self.name# + ' for ' + self.category + ' issues.'

class Category(models.Model):
    name = models.CharField(max_length=50)
    referrals = models.ManyToManyField(Referral)

    def __str__(self):
        return self.name

class Subcategory(models.Model):
    name = models.CharField(max_length=50)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.name + ' is a subcategory of ' + self.category.name
