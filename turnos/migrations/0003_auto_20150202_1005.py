# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('turnos', '0002_auto_20150118_1747'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='calendar',
            options={'get_latest_by': 'month'},
        ),
    ]
