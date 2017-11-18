# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth import authenticate, login
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import redirect, render
import json

from .models import Referral, Category

# Create your views here.

@csrf_exempt
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

    return HttpResponse(json.dumps(data))

def login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)

        if form.is_valid():
            user_object = form.cleaned_data
            username = user_object['username']
            password = user_object['password']
            user = authenticate(username=username, password=password)

            if user is not None:
                login(request, user)
                return redirect(main)
            else:
                raise forms.ValidationError(_('Username or password are incorrect!'))
    else:
        form = LoginForm()

    return render(request, 'tournaments/index.html', {'form': form})
