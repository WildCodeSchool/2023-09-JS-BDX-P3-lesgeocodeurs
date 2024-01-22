-- Active: 1699867392377@@127.0.0.1@3306@geocode

-- Création de la table d'import
CREATE TABLE import (
	nom_amenageur VARCHAR(255),
	siren_amenageur INTEGER,
	contact_amenageur VARCHAR(255),
	nom_operateur VARCHAR(255),
	contact_operateur VARCHAR(255),
	telephone_operateur VARCHAR(255),
	nom_enseigne VARCHAR(255),
	id_station_itinerance VARCHAR(255),
	id_station_local VARCHAR(255),
	nom_station VARCHAR(255),
	implantation_station VARCHAR(255),
	adresse_station VARCHAR(255),
	code_insee_commune INTEGER,
	coordonneesXY VARCHAR(255),
	nbre_pdc INTEGER,
	id_pdc_itinerance VARCHAR(255),
	id_pdc_local VARCHAR(255),
	puissance_nominale INTEGER,
	prise_type_ef VARCHAR(255),
	prise_type_2 VARCHAR(255),
	prise_type_combo_ccs VARCHAR(255),
	prise_type_chademo VARCHAR(255),
	prise_type_autre VARCHAR(255),
	gratuit VARCHAR(255),
	paiement_acte VARCHAR(255),
	paiement_cb VARCHAR(255),
	paiement_autre VARCHAR(255),
	tarification VARCHAR(255),
	condition_acces VARCHAR(255),
	reservation VARCHAR(255),
	horaires VARCHAR(255),
	accessibilite_pmr VARCHAR(255),
	restriction_gabarit VARCHAR(255),
	station_deux_roues VARCHAR(255),
	raccordement VARCHAR(255),
	num_pdl VARCHAR(255),
	date_mise_en_service VARCHAR(255),
	observations VARCHAR(128),
	date_maj VARCHAR(255),
	cable_t2_attache VARCHAR(255),
	last_modified VARCHAR(255),
	datagouv_dataset_id VARCHAR(255),
	datagouv_resource_id VARCHAR(255),
	datagouv_organization_or_owner VARCHAR(255),
	consolidated_longitude REAL,
	consolidated_latitude REAL,
	consolidated_code_postal INTEGER,
	consolidated_commune VARCHAR(255),
	consolidated_is_lon_lat_correct VARCHAR(255),
	consolidated_is_code_insee_verified VARCHAR(255) NULL
);

-- Désactiver le mode strict pour le chargement de données locales
SET GLOBAL local_infile = 1;

-- Chargement des données du fichier CSV dans la table d'import
LOAD DATA LOCAL INFILE '/Users/antoinecairey/code/wild-code-school/projet3/geocode/backend/database/data.csv'
INTO TABLE import
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

-- Rétablir le mode strict pour le chargement de données locales (facultatif)
SET GLOBAL local_infile = 0;

-- Créer les stations
insert into station (name, address, latitude, longitude) (
	select distinct nom_station, adresse_station, consolidated_latitude , consolidated_longitude
	from import
);

-- Créer les bornes
insert into charging_point (name, power, station_id) (
	select id_pdc_itinerance, puissance_nominale, (
		select id from station  where name = nom_station limit 1
	)
	from import
);

-- Créer les prises EF
insert into charging_point_plug_type (charging_point_id, plug_type_id) (
	select (
		select id from charging_point where name = id_pdc_itinerance limit 1
	), 1
	from import
	where prise_type_ef = "true"
);

-- Créer les prises Type 2
insert into charging_point_plug_type (charging_point_id, plug_type_id) (
	select (
		select id from charging_point where name = id_pdc_itinerance limit 1
	), 2
	from import
	where prise_type_2 = "true"
);

-- Créer les prises Combo CCS
insert into charging_point_plug_type (charging_point_id, plug_type_id) (
	select (
		select id from charging_point where name = id_pdc_itinerance limit 1
	), 3
	from import
	where prise_type_combo_ccs = "true"
);

-- Créer les prises Chademo
insert into charging_point_plug_type (charging_point_id, plug_type_id) (
	select (
		select id from charging_point where name = id_pdc_itinerance limit 1
	), 4
	from import
	where prise_type_chademo = "true"
);

-- Créer les prises Autre
insert into charging_point_plug_type (charging_point_id, plug_type_id) (
	select (
		select id from charging_point where name = id_pdc_itinerance limit 1
	), 5
	from import
	where prise_type_autre = "true"
);