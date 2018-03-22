package com.katefree.family.budget.entity;

import java.math.BigDecimal;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

/**
 * Expense
 *
 * @author Ekaterina Tsapaeva
 * @since 22/03/2018
 */
@Data
@Entity
public class Expense {

    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private BigDecimal amount;
    private String description;

    private Expense() {
    }

}