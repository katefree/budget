package com.katefree.family.budget.repo;

import com.katefree.family.budget.entity.Expense;
import org.springframework.data.repository.CrudRepository;

public interface ExpenseRepository extends CrudRepository<Expense, Long> {

}