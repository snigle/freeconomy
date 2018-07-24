package com.freeconomy.models;

import java.util.Date;

/**
 * Created by lamarch on 06/04/18.
 */

public class Wallet {
    public String Name;
    public String UUID;
    public TotalYear[] TotalPerYear;
    public Date LastUpdate;

    // Inputs
    public String Description;
    public Currency Currency;
    public Icon Icon;
    public Double Solde;
}
