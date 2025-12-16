---
title: 'Step 6: Final Review Checklist'
sidebar_position: 6
effectiveDate: 2025-12-16
owners:
  - Workflow Team
---

# Step 6: Final Review Before Submission

Before submitting your work, complete this comprehensive review to catch common issues and ensure quality.

## Complete Submission Review

### Intent (Step 1)
- [ ] Intent is clear and specific
- [ ] Success criteria are measurable
- [ ] Scope is appropriate (not too broad/narrow)
- [ ] Aligns with failure mode categories
- [ ] No ambiguous language

### System Prompt (Step 2)
- [ ] Defines role/persona clearly
- [ ] Includes all necessary instructions
- [ ] Specifies tool permissions (if needed)
- [ ] States constraints clearly
- [ ] No contradictory rules
- [ ] Enables the intent

### User Prompt(s) (Step 3)
- [ ] Natural and realistic
- [ ] Complete context provided
- [ ] Tests the intent appropriately
- [ ] No assumed missing information
- [ ] Appropriate complexity
- [ ] Proper grammar/spelling
- [ ] (For multi-turn) Logical flow between turns

### Bad Response (Step 4)
- [ ] Demonstrates ONE specific failure mode
- [ ] Failure is obvious and clear
- [ ] Realistic (could come from AI)
- [ ] Matches defined failure mode category
- [ ] Not multiple failures mixed together
- [ ] Not nonsensical or artificial

### Good Response (Step 5)
- [ ] Fulfills the intent completely
- [ ] Follows all system prompt instructions
- [ ] Clearly avoids the failure mode
- [ ] Natural, human-like tone
- [ ] Appropriate level of detail
- [ ] Factually accurate (when applicable)
- [ ] Well-structured and clear
- [ ] Creates obvious contrast with bad response

## Cross-Component Verification

### Consistency Check
- [ ] System prompt enables what intent requires
- [ ] User prompt tests what intent specifies
- [ ] Bad response violates intent or system prompt
- [ ] Good response fulfills both intent and system prompt
- [ ] All components work together coherently

### Quality Standards
- [ ] Meets minimum quality bar for training data
- [ ] Would be useful for model learning
- [ ] Clear educational value (teaches good vs. bad)
- [ ] No confusing or contradictory elements

### Technical Requirements
- [ ] All required fields completed
- [ ] Proper formatting throughout
- [ ] Links/references work (if applicable)
- [ ] Metadata fields filled (effective date, owners)
- [ ] Follows template structure

## Common Pre-Submission Catches

### Things Submitters Often Forget

1. **Citations in Good Response**
   - If system prompt requires sources, good response must include them!

2. **Tool Usage**
   - If system prompt grants tool access and user prompt needs it, responses should reflect tool use

3. **Constraint Violations**
   - Bad response should clearly violate a constraint
   - Good response should clearly respect all constraints

4. **Context Continuity**
   - In multi-turn scenarios, check that context flows naturally

5. **Failure Mode Documentation**
   - Note which specific failure mode the bad response demonstrates

## Self-Review Questions

Ask yourself:

### Intent & Design
- **Why** did I choose this intent?
- **What** specific failure mode am I testing?
- **How** does this help model training?

### Clarity
- Could a **new reviewer** understand this without explanation?
- Is the **failure mode** immediately obvious?
- Is the **contrast** between good and bad clear?

### Realism
- Would a **real user** ask this way?
- Could an **AI** actually produce this bad response?
- Does the **good response** sound natural?

### Completeness
- Have I included **all necessary context**?
- Are there any **assumptions** I'm making?
- Could this submission **stand alone**?

## Final Quality Assessment

Rate your submission honestly:

| Aspect | Self-Assessment |
|--------|----------------|
| Intent clarity | ⭐⭐⭐⭐⭐ |
| System prompt quality | ⭐⭐⭐⭐⭐ |
| User prompt realism | ⭐⭐⭐⭐⭐ |
| Bad response clarity | ⭐⭐⭐⭐⭐ |
| Good response quality | ⭐⭐⭐⭐⭐ |
| Overall coherence | ⭐⭐⭐⭐⭐ |

**Minimum bar:** All aspects should be at least ⭐⭐⭐⭐ (4/5)

If anything is below 4 stars, **revise before submitting**.

## Ready to Submit?

### Green Lights ✅
- All checklist items verified
- All components are high quality
- Clear contrast between good and bad
- Coherent end-to-end flow
- Meets training data needs

### Red Flags 🚩
- Any checklist item failed
- Unclear or ambiguous elements
- Subtle or questionable failure mode
- Missing context or information
- Would confuse reviewers

## Post-Submission

After submitting:

1. **Review Feedback Carefully**
   - If rejected, read reviewer comments thoroughly
   - Address all points raised
   - Ask for clarification if needed

2. **Learn from Patterns**
   - Track common feedback you receive
   - Adjust your approach accordingly
   - Review guidelines for those areas

3. **Iterate and Improve**
   - Use feedback to get better
   - Refer back to examples
   - Ask questions when unsure

---

**Previous:** [Step 5: Good Response](step-5-good-response)

:::tip Pro Tip
Print this checklist or keep it open in a second window while creating submissions!
:::

:::note TODO
**Content to Add:**
- Interactive checklist widget
- Automated validation rules
- Common last-minute catches
- Submission quality statistics
:::
