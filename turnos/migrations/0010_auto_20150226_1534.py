# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('turnos', '0009_auto_20150225_0922'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='eventroles',
            unique_together=set([('event', 'role')]),
        ),
    ]
