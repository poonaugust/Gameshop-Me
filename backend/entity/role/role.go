package entity

import "gorm.io/gorm"

type Role struct {
	gorm.Model
	Title string
	Description string

	

	RolePermission []RolePermission `gorm:"foreignKey:RoleID"`
	Users []User  `gorm:"foreignKey:RoleID"`
}