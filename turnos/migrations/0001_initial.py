# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Calendar',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('month', models.DateField()),
                ('observation', models.TextField(default=b'', blank=True)),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name=b'date created')),
                ('updated', models.DateTimeField(auto_now=True, verbose_name=b'date updated')),
            ],
            options={
                'db_table': 'calendar',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Department',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(unique=True, max_length=250)),
            ],
            options={
                'db_table': 'department',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=30)),
                ('date', models.DateTimeField(verbose_name=b'event date')),
            ],
            options={
                'db_table': 'event',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='EventId',
            fields=[
                ('event', models.OneToOneField(primary_key=True, serialize=False, to='turnos.Event')),
                ('number', models.IntegerField(default=0)),
            ],
            options={
                'db_table': 'event_id',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='EventRoles',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('event', models.ForeignKey(to='turnos.Event')),
            ],
            options={
                'db_table': 'event_roles',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Person',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=20)),
                ('first_surname', models.CharField(max_length=20)),
                ('second_surname', models.CharField(max_length=20, blank=True)),
                ('email', models.EmailField(max_length=75, blank=True)),
                ('address', models.CharField(max_length=200, blank=True)),
                ('pbox', models.CharField(default=b'', max_length=10, blank=True)),
                ('city', models.CharField(max_length=100, blank=True)),
                ('province', models.CharField(max_length=100, blank=True)),
                ('country', models.CharField(max_length=100, blank=True)),
                ('number', models.CharField(max_length=20, blank=True)),
                ('nationality', models.CharField(default=b'', max_length=100, blank=True)),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name=b'date created')),
                ('updated', models.DateTimeField(auto_now=True, verbose_name=b'date updated')),
                ('department', models.ManyToManyField(to='turnos.Department', blank=True)),
            ],
            options={
                'db_table': 'person',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Response',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('comment', models.CharField(max_length=150, blank=True)),
                ('response', models.BooleanField(default=True)),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name=b'date created')),
                ('updated', models.DateTimeField(auto_now=True, verbose_name=b'date updated')),
                ('event', models.ForeignKey(to='turnos.Event')),
                ('person', models.ForeignKey(to='turnos.Person')),
            ],
            options={
                'db_table': 'response',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=20)),
                ('department', models.ForeignKey(to='turnos.Department')),
            ],
            options={
                'db_table': 'role',
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='eventroles',
            name='persons',
            field=models.ManyToManyField(to='turnos.Person'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='eventroles',
            name='role',
            field=models.ForeignKey(to='turnos.Role'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='event',
            name='calendar',
            field=models.ForeignKey(to='turnos.Calendar'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='event',
            name='roles',
            field=models.ManyToManyField(to='turnos.Role', through='turnos.EventRoles'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='calendar',
            name='department',
            field=models.ForeignKey(to='turnos.Department'),
            preserve_default=True,
        ),
        migrations.AlterUniqueTogether(
            name='calendar',
            unique_together=set([('month', 'department')]),
        ),
    ]
