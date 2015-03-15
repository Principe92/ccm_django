# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('turnos', '0008_auto_20150222_2113'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='calendar',
            field=models.ForeignKey(related_name='cal_event', to='turnos.Calendar'),
            preserve_default=True,
        ),
    ]
