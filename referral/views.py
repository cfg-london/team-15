# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
import json

from models import Referral

# Create your views here.

def add_referral(request):
    data = json.loads(request.body.decode("utf-8"))

    sender = data['sender']
    name = data['name']
    phone = data['phone']
    urgency = data['urgency']
    category_name = data['category_name']

    category = Category(name=category_name)
    category.save()

    referral = Referral(sender=sender, name=name, phone=phone, urgency=urgency);
    referral.save()

    category.referrals.add(referral)

    return HttpResponse("Hello World!" + json.dumps(data))
