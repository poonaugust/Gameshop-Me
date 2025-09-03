package entity

import "gorm.io/gorm"

type Permission struct {
	gorm.Model
	Title string
	Description string

	
	RolePermission []RolePermission `gorm:"foreignKey:PermissionID"`
}