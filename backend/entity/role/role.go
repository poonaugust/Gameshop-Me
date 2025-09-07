package entity

import "gorm.io/gorm"

type Role struct {
	gorm.Model
	Title string
	Description string

	

	Users []User  `gorm:"foreignKey:RoleID"`
}