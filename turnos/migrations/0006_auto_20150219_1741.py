# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('turnos', '0005_auto_20150217_1817'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person',
            name='department',
            field=models.ManyToManyField(related_name='members', to='turnos.Department'),
            preserve_default=True,
        ),
    ]
